export default (store) => (next) => (action) => {
  // 1. Let the action pass through to the reducer first
  const result = next(action); 
  
  // 2. Grab the newly updated state
  const state = store.getState();
  
  try {
    // 3. Save only the ticket slice data to localStorage
    localStorage.setItem("tickets_state", JSON.stringify(state.ticket));
  } catch (error) {
    console.error("Failed to save state to localStorage:", error);
  }

  return result;
};
