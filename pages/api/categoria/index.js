import dbConnect from "../../../utils/dbConnect"; 
import Categoria from '../../../models/Categoria';
import Restaurante from "../../../models/Restaurante";
import middlewareAuth from '../../../middlewares/auth';

dbConnect();

const handler = async(req, res) => {
    const { method } = req;
    switch(method){
        case 'GET':
            try{
                const categorias = await Categoria.find().populate({ path: 'restaurante', model: Restaurante });
                res.status(200).json({success: true, categorias: categorias})
            }catch(error){
                res.status(400).json({success: false, message: `Falha na obter categorias! ${error}`});
            }
            break;
        case 'POST':
            try{
                console.log(req.body);
                const categoria = await Categoria.create({...req.body, restaurante: req.body.restaurante});
                res.status(201).json({success: true, categoria: categoria})
            }catch(error){
                res.status(400).json({success: false, message: `Falha na criação do categoria! ${error}`});
            }
            break;
        default:
            res.status(400).json({success: false, message: "Requisição inválida"});
            break;
    }
}
export default middlewareAuth(handler);