import React, { useMemo, useState } from "react";
import { ListView } from "@progress/kendo-react-listview";
import { Input } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import events from "../data/events";

// One card in the ListView
const EventItem = (props) => {
    const e = props.dataItem;

    const pillStyle = {
        fontSize: 12,
        background: "#eef2f7",
        padding: "2px 8px",
        borderRadius: 6,
        display: "inline-block",
        marginBottom: 6,
        color: "#244361",
        fontWeight: 600
    };

    const priceStyle = {
        color: e.priceType === "Free" ? "#0a7f2e" : "#b76e00",
        fontWeight: 700
    };

    return (
        <div
            style={{
                display: "flex",
                gap: 20,
                marginBottom: 16,
                border: "1px solid #e6e8eb",
                borderRadius: 10,
                overflow: "hidden",
                background: "#fff"
            }}
        >
            <img
                src={e.image}
                alt={e.title}
                width="260"
                height="160"
                style={{ objectFit: "cover" }}
            />
            <div style={{ padding: 14, flex: 1 }}>
                <span style={pillStyle}>{e.category}</span>
                <h3 style={{ margin: "4px 0 8px", lineHeight: 1.2 }}>{e.title}</h3>
                <p style={{ margin: "2px 0" }}>
                    <strong>Date:</strong> {new Date(e.date).toDateString()}
                </p>
                <p style={{ margin: "2px 0" }}>
                    <strong>Location:</strong> {e.location}
                </p>
                <p style={{ margin: "2px 0" }}>
                    <strong>Language:</strong> {e.language} &nbsp;•&nbsp; <strong>Region:</strong> {e.region}
                </p>
                <p style={{ margin: "8px 0 0" }}>
                    <span style={priceStyle}>{e.priceType}</span>
                </p>
            </div>
        </div>
    );
};

export default function EventList() {
    // Filters
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [language, setLanguage] = useState("All");
    const [region, setRegion] = useState("All");

    // Build dropdown data from the events list
    const categories = useMemo(
        () => ["All", ...Array.from(new Set(events.map((x) => x.category)))],
        []
    );
    const languages = useMemo(
        () => ["All", ...Array.from(new Set(events.map((x) => x.language)))],
        []
    );
    const regions = useMemo(
        () => ["All", ...Array.from(new Set(events.map((x) => x.region)))],
        []
    );

    // Filtering logic
    const filteredEvents = useMemo(() => {
        const q = search.trim().toLowerCase();

        return events.filter((e) => {
            const matchesSearch =
                !q ||
                e.title.toLowerCase().includes(q) ||
                e.location.toLowerCase().includes(q);

            const matchesCategory = category === "All" || e.category === category;
            const matchesLanguage = language === "All" || e.language === language;
            const matchesRegion = region === "All" || e.region === region;

            return matchesSearch && matchesCategory && matchesLanguage && matchesRegion;
        });
    }, [search, category, language, region]);

    return (
        <div>
            <h2 style={{ marginTop: 0, marginBottom: 16 }}>Cultural Events</h2>

            {/* Filters */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr 1fr",
                    gap: 12,
                    marginBottom: 20
                }}
            >
                <Input
                    placeholder="Search events by name or location…"
                    value={search}
                    onChange={(e) => setSearch(e.value)} // Kendo Input uses e.value
                />
                <DropDownList
                    data={categories}
                    value={category}
                    onChange={(e) => setCategory(e.value)}
                />
                <DropDownList
                    data={languages}
                    value={language}
                    onChange={(e) => setLanguage(e.value)}
                />
                <DropDownList
                    data={regions}
                    value={region}
                    onChange={(e) => setRegion(e.value)}
                />
            </div>

            {/* List */}
            <ListView data={filteredEvents} item={EventItem} />
        </div>
    );
}
