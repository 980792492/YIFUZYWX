export const isLoading = state => {
  return state.user.isLoading || state.apply.isLoading
}
