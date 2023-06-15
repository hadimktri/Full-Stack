// This is just an example store with fake data
const PostStore = (set) => ({

  postsLoading: true,
  setPostLoading: (value) => { set((state) => ({ postsLoading: value })) }
  
  // bears: 0,
  // addBear: () => set((state) => ({ bears: state.bears + 1 })),
});

export default PostStore;
