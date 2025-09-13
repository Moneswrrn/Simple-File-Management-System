<template>
  <div class="note-list">
    <div v-if="notes.length === 0">No notes yet.</div>
    <div v-for="note in notes" :key="note.id" class="note-card">
      <h3>{{ note.title }}</h3>
      <p>{{ note.content }}</p>
      <div class="actions">
        <button @click="deleteNoteItem(note.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteNote } from "../api.js";

export default {
  props: { notes: Array },
  emits: ["note-deleted"],
  setup(props, { emit }) {
    const deleteNoteItem = async (id) => {
      if (confirm("Are you sure you want to delete this note?")) {
        await deleteNote(id);
        emit("note-deleted"); // notify parent to reload notes
      }
    };
    return { deleteNoteItem };
  },
};
</script>

<style scoped>
.note-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.note-card {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}
.note-card h3 {
  margin: 0 0 0.5rem;
}
.note-card .actions {
  margin-top: 0.5rem;
}
.note-card button {
  padding: 0.25rem 0.5rem;
  background-color: #ef4444;
  color: white;
  border: none;
  cursor: pointer;
}
.note-card button:hover {
  background-color: #b91c1c;
}
</style>
