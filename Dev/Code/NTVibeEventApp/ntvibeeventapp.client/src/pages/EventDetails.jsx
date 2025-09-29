import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getEventById, deleteEvent } from "../api/events";

export default function EventDetails() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [showZoom, setShowZoom] = useState(false);
    const navigate = useNavigate();

    // ✅ Load logged in user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        async function fetchEvent() {
            try {
                const data = await getEventById(id);
                setEvent(data);
            } catch (err) {
                console.error("Failed to fetch event:", err);
            }
        }
        fetchEvent();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            try {
                await deleteEvent(id);
                navigate("/events");
            } catch (err) {
                console.error("Delete failed:", err);
                alert("Failed to delete event.");
            }
        }
    };

    if (!event) return <p className="text-center">Loading...</p>;

    return (
        <div className="container my-4">
            {/* ✅ Banner with Zoom Button */}
            {event.bannerFilePath && (
                <div className="mb-4 position-relative">
                    <img
                        src={`https://localhost:7125/${event.bannerFilePath}`}
                        alt="Event Banner"
                        className="img-fluid w-100"
                        style={{ maxHeight: "400px", objectFit: "cover" }}
                    />

                    {/* Zoom ↔ Icon */}
                    {/* Zoom icon at top-right */}

                    <button
                        style={styles.zoomButton}
                        onClick={() => setShowZoom(true)}
                    >
                        ⤢
                    </button>
                </div>
            )}

            {/* ✅ Modal for full image */}



            {showZoom && (


                <div style={styles.modal}>


                    <span style={styles.close} onClick={() => setShowZoom(false)}>


                        ✖


                    </span>


                    <img


                        src={`https://localhost:7125/${event.bannerFilePath}`}


                        alt="Zoomed Banner"


                        style={styles.zoomImage}


                    />


                </div>


            )}

            {/* ✅ Two-column layout */}
            <div className="row">
                {/* Left column → Event details */}
                <div className="col-md-8">
                    <h1>{event.title}</h1>
                    <p>
                        <strong>Date:</strong>{" "}
                        {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p>
                        <strong>Category:</strong> {event.category}
                    </p>

                    <h3>About this event</h3>
                    <p>{event.description}</p>
                </div>

                {/* Right column → Buttons + Card */}
                <div className="col-md-4">
                    <div className="d-flex justify-content-end mb-3 gap-2">
                        <Link to="/events" className="btn btn-success btn-sm">
                            ← Back
                        </Link>

                        {user?.role === "Organiser" && (
                            <>
                                <button
                                    className="btn btn-warning btn-sm"
                                    onClick={() => navigate(`/events/edit/${id}`)}
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={handleDelete}
                                >
                                    🗑 Delete
                                </button>
                            </>
                        )}
                    </div>

                    <div className="card shadow-sm p-3">
                        <h5>Location</h5>
                        <p>{event.location}</p>

                        <h5>Price</h5>
                        <p>{event.price ?? "Free"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    zoomButton: {



        position: "absolute",


        top: "12px",


        right: "12px",


        background: "rgba(0,0,0,0.7)",


        color: "#fff",


        border: "none",


        borderRadius: "50%",


        width: "32px",        // smaller circle


        height: "32px",


        display: "flex",      // center the arrow


        alignItems: "center",


        justifyContent: "center",


        fontSize: "16px",     // smaller arrow


        cursor: "pointer",


        transition: "0.3s ease",


    },


    zoomButtonHover: {


        background: "rgba(0,0,0,0.9)",


        transform: "scale(1.1)",


    },
    modal: {



        position: "fixed",


        top: 0,


        left: 0,


        width: "100%",


        height: "100%",


        backgroundColor: "rgba(0,0,0,0.8)",


        display: "flex",


        justifyContent: "center",


        alignItems: "center",


        zIndex: 9999,


    },


    close: {


        position: "absolute",


        top: "20px",


        right: "30px",


        fontSize: "30px",


        color: "#fff",


        cursor: "pointer",


    },


    zoomImage: {


        maxWidth: "90%",


        maxHeight: "90%",


        borderRadius: "8px",


    },
};
