export default function useUploadPost(formData = {}) {
  const [formData, setFormData] = useState();
const uploadPost = async (postData) => {
    await db
      .collection('posts')
      .doc()
      .set({
        ...postData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    return;
}
