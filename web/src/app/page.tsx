"use client";
import { useEffect, useState } from "react";

type Item = { id: number; name: string; description: string };

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const load = async () => setItems(await (await fetch("/api/items")).json());
  useEffect(() => { load(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(editId ? `/api/items/${editId}` : "/api/items", {
      method: editId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });
    setName(""); setDescription(""); setEditId(null); load();
  };

  const remove = async (id: number) => {
    await fetch(`/api/items/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <main style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Items CRUD</h1>
      <form onSubmit={save} style={{ display: "flex", gap: 8 }}>
        <input required placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">{editId ? "Update" : "Add"}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setName(""); setDescription(""); }}>Cancel</button>}
      </form>
      <ul>
        {items.map((i) => (
          <li key={i.id} style={{ margin: "8px 0" }}>
            <b>{i.name}</b> - {i.description}{" "}
            <button onClick={() => { setEditId(i.id); setName(i.name); setDescription(i.description); }}>Edit</button>{" "}
            <button onClick={() => remove(i.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
