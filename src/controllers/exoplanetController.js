import { exportDataToCSV, fetchAllExoplanets, fetchExoplanetsByDisposition, fetchExoplanetsWithLimit } from "../services/exoplanetService.js";

export const getAllExoplanets = async (_, res) => {
    try {
        const data = await fetchAllExoplanets();
        if (!data || data.length === 0)
            return res.status(404).json({ message: "Nenhum exoplaneta foi encontrado !" })
        return res.json(data);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Erro interno do servidor"
        })
    }
}
export const getExoplanetsWithLimits = async (req, res) => {
    try {
        const { limit } = req.params;
        if (!limit)
            return res.status(400).json({
                message: "O parâmetro 'limits' é obrigatorio."
            })
        const newLimit = parseInt(limit);
        if (isNaN(newLimit) || newLimit <= 0)
            return res.status(400).json({ message: "O limit deve ser um numero inteiro positivo e maior que 0" })
        const data = await fetchExoplanetsWithLimit(newLimit);
        if (!data || data.length === 0)
            return res.status(404).json({ message: "Não foi encontrado nenhum exoplaneta." })
        return res.json(data);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Erro interno do servidor"
        })
    }
}
export const getExoplanetsByDisposition = async (req, res) => {
    const { type } = req.params;
    if (!type)
        return res.status(400).json({ message: "O parâmetro disposition é obrigatoria" })
    const data = await fetchExoplanetsByDisposition(type);
    if (!data || data.length === 0)
        return res.status(404).json({ message: "Não foi encontrado nenhum exoplaneta." })
    return res.json(data);
}