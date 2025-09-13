<template>
  <div class="container">
    <h1>Simple File Management System</h1>
    <NoteForm @note-added="fetchNotes" />
    <NoteList :notes="notes" @note-deleted="fetchNotes" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import NoteForm from './components/NoteForm.vue';
import NoteList from './components/NoteList.vue';
import { fetchNotes } from './api.js';

export default {
  components: { NoteForm, NoteList },
  setup() {
    const notes = ref([]);

    const loadNotes = async () => {
      notes.value = await fetchNotes();
    };

    onMounted(loadNotes);

    return { notes, fetchNotes: loadNotes };
  }
};
</script>

<style>
/* optional styling */
.container { max-width: 600px; margin: 2rem auto; }
</style>
