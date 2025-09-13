<template>
  <form @submit.prevent="submitNote" class="note-form">
    <input
      v-model="title"
      type="text"
      placeholder="Enter note title"
      required
    />
    <textarea
      v-model="content"
      placeholder="Enter note content"
    ></textarea>
    <button type="submit">Add Note</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { createNote } from "../api.js";

export default {
  emits: ["note-added"],
  setup(props, { emit }) {
    const title = ref("");
    const content = ref("");

    const submitNote = async () => {
      if (!title.value.trim()) return;
      await createNote({ title: title.value, content: content.value });
      title.value = "";
      content.value = "";
      emit("note-added"); // notify parent to reload notes
    };

    return { title, content, submitNote };
  },
};
</script>

<style scoped>
.note-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.note-form input,
.note-form textarea {
  padding: 0.5rem;
  font-size: 1rem;
}
.note-form button {
  padding: 0.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  cursor: pointer;
}
.note-form button:hover {
  background-color: #2563eb;
}
</style>
