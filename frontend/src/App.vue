<template>
  <div class="container">
    <h1>Simple File Management System</h1>
    <NoteForm @note-added="loadNotes" />
    <NoteList :notes="notes" @note-deleted="loadNotes" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import NoteForm from "./components/NoteForm.vue";
import NoteList from "./components/NoteList.vue";
import { fetchNotes } from "./services/api.js";

export default {
  components: { NoteForm, NoteList },
  setup() {
    const notes = ref([]);

    const loadNotes = async () => {
      notes.value = await fetchNotes();
    };

    onMounted(loadNotes);

    return { notes, loadNotes };
  },
};
</script>

<style>
.container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: Arial, sans-serif;
}
</style>
