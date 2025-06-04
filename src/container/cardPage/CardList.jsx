import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Alert } from "@mui/material";
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
function CardList() {
  const API = "https://683ff0e65b39a8039a563029.mockapi.io/Cards";

  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [newCard, setNewCard] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [editCard, setEditCard] = useState({
    id: "",
    title: "",
    description: "",
    date: "",
  });
  const [editMode, setEditMode] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(API);
        setCards(response.data);
        // Filter cards based on search term
        if (searchTerm) {
          const results = response.data.filter((card) =>
            card.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setSearchResults(results);
        } else {
          setSearchResults(response.data);
        }
      } catch (err) {
        setError(err.message);
        setTimeout(() => setError(""), 1500);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, [searchTerm]);

  const handleAddHomework = async () => {
    if (!newCard.title || !newCard.description || !newCard.date) {
      setError("Please fill in all fields");
      setTimeout(() => setError(""), 1500);
      return;
    }
    try {
      const response = await axios.post(API, newCard);
      // now prevCards is always an array
      setCards((prev) => [...prev, response.data]);
      setSuccess("Homework added successfully!");
      setNewCard({ title: "", description: "", date: "" });
      setTimeout(() => setSuccess(""), 1500);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 1500);
    }
  };
  const HandelDeleteCard = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setCards((prev) => prev.filter((card) => card.id !== id));
      setSuccess("Card deleted successfully!");
      setTimeout(() => setSuccess(""), 1500);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 1500);
    }
  };

  return (
    <>
      {error && (
        <Alert
          severity="error"
          onClose={() => setError("")}
          className="fixed top-5 left-1/2 transform -translate-x-1/2 w-72 md:w-96 z-55"
        >
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          severity="success"
          onClose={() => setSuccess("")}
          className="fixed top-5 left-1/2 transform -translate-x-1/2 w-72 md:w-96 z-55"
        >
          {success}
        </Alert>
      )}
      <div className="flex flex-col py-5 gap-5 items-center min-h-screen bg-neutral-100 px-5 md:px-15 lg:px-25">
        {localStorage.getItem("userType") === "admin" && (
          <div className="flex flex-col w-fit px-3 gap-3 items-center py-3 justify-center shadow-lg bg-white rounded-xl">
            <div className="w-full">
              <input
                type="text"
                placeholder="Homework Title"
                className="border border-gray-300/50 p-2 px-5 rounded-lg w-72 focus:outline-2 focus:outline-violet-600/50 hover:shadow-md transition-shadow duration-300 shadow-violet-500/20 hover:border-violet-600/50  focus:bg-neutral-200/50"
                value={newCard.title}
                onChange={(e) =>
                  setNewCard({ ...newCard, title: e.target.value })
                }
              />
            </div>
            <div className="flex justify-between w-full">
              <h1 className=" text-xl">Date:</h1>
              <input
                type="date"
                className="border border-gray-300/50 py-1 px-5 rounded-lg w-52 focus:outline-2 focus:outline-violet-600/50 hover:shadow-md transition-shadow duration-300 shadow-violet-500/20 hover:border-violet-600/50  focus:bg-neutral-200/50"
                value={newCard.date}
                onChange={(e) =>
                  setNewCard({ ...newCard, date: e.target.value })
                }
              />
            </div>
            <div>
              <textarea
                placeholder="Homework Description"
                className="border border-gray-300/50 p-2 px-5 rounded-lg w-72 focus:outline-2 focus:outline-violet-600/50 hover:shadow-md transition-shadow duration-300 shadow-violet-500/20 hover:border-violet-600/50  focus:bg-neutral-200/50"
                value={newCard.description}
                onChange={(e) =>
                  setNewCard({ ...newCard, description: e.target.value })
                }
              ></textarea>
            </div>
            <button
              className="bg-violet-600 text-white px-4 py-2 rounded-xl hover:bg-violet-700 transition cursor-pointer hover:scale-105"
              onClick={handleAddHomework}
            >
              Add Homework
            </button>
          </div>
        )}
        <div className="w-full flex flex-col md:flex-row border-b-2 gap-2 justify-between pb-2 border-neutral-200">
          <h1 className="text-2xl font-bold">Card List</h1>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search..."
            className="border border-gray-300/50 p-2 px-5 rounded-lg w-full md:w-1/3 focus:outline-2 focus:outline-violet-600/50 hover:shadow-md transition-shadow duration-300 shadow-violet-500/20 hover:border-violet-600/50  focus:bg-neutral-200/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full justify-items-center">
            {[...searchResults].reverse().map((card) => (
              <div
                key={card.id}
                className="bg-white p-4 px-6 flex flex-col  gap-3 rounded-xl w-full shadow hover:shadow-lg transition-all duration-300 "
              >
                {editMode && editCard.id === card.id ? (
                  <input
                    type="text"
                    className="font-bold text-center text-lg md:text-xl lg:text-2xl border border-gray-300/50 p-2 rounded-lg w-full"
                    value={editCard.title}
                    onChange={(e) =>
                      setEditCard({ ...editCard, title: e.target.value })
                    }
                  />
                ) : (
                  <h2 className="font-bold text-center text-lg md:text-xl lg:text-2xl">
                    {card.title}
                  </h2>
                )}

                <div className="text-base md:text-lg lg:text-xl break-all h-full">
                  <p className="font-bold ">Description:</p>
                  <hr className="my-1 text-neutral-200" />
                  {editMode && editCard.id === card.id ? (
                    <textarea
                      className="border border-gray-300/50 p-2 rounded-lg w-full"
                      value={editCard.description}
                      onChange={(e) =>
                        setEditCard({
                          ...editCard,
                          description: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p>{card.description}</p>
                  )}
                </div>
                <div className="">
                  <p className="font-bold ">Due Date:</p>
                  <hr className="my-1 text-neutral-200" />
                  {editMode && editCard.id === card.id ? (
                    <input
                      type="date"
                      className="border border-gray-300/50 py-1 px-2 rounded-lg w-full"
                      value={editCard.date}
                      onChange={(e) =>
                        setEditCard({ ...editCard, date: e.target.value })
                      }
                    />
                  ) : (
                    <p>{card.date}</p>
                  )}
                </div>
                {localStorage.getItem("userType") === "admin" && (
                  <div className="flex justify-end gap-2">
                    {editMode && editCard.id === card.id ? (
                      <>
                        <button
                          className="bg-violet-600 text-white px-3 py-1 rounded-xl hover:bg-violet-700 transition"
                          onClick={async () => {
                            try {
                              const { data } = await axios.put(
                                `${API}/${editCard.id}`,
                                editCard
                              );
                              setCards((prev) =>
                                prev.map((c) => (c.id === data.id ? data : c))
                              );
                              setSearchResults((prev) =>
                                prev.map((c) => (c.id === data.id ? data : c))
                              );
                              setSuccess("Card updated successfully!");
                              setTimeout(() => setSuccess(""), 1500);
                            } catch (err) {
                              setError(err.message);
                              setTimeout(() => setError(""), 1500);
                            }
                            setEditMode(false);
                            setEditCard({
                              id: "",
                              title: "",
                              description: "",
                              date: "",
                            });
                          }}
                        >
                          Save
                        </button>
                        <button
                          className="text-gray-500 hover:text-neutral-100 py-1 px-2 rounded-xl hover:bg-gray-500 cursor-pointer transition duration-300"
                          onClick={() => {
                            setEditMode(false);
                            setEditCard({
                              id: "",
                              title: "",
                              description: "",
                              date: "",
                            });
                          }}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="text-neutral-100 py-1 px-2 rounded-xl bg-blue-600 hover:bg-blue-500 cursor-pointer transition duration-300 hover:scale-105"
                          onClick={() => {
                            setEditMode(true);
                            setEditCard({
                              id: card.id,
                              title: card.title,
                              description: card.description,
                              date: card.date,
                            });
                          }}
                        >
                          <CiEdit className="text-xl" />
                        </button>
                        <button
                          className="text-neutral-100  py-1 px-2 rounded-xl bg-red-600 hover:bg-red-500 cursor-pointer transition duration-300 hover:scale-105"
                          onClick={() => HandelDeleteCard(card.id)}
                        >
                          <CiTrash className="text-xl" />
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default CardList;
