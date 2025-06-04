const api = async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    res.status(200).json(null);
}
export default api 