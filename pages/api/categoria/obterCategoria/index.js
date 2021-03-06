import dbConnect from "../../../../utils/dbConnect"; 
import Categoria from '../../../../models/Categoria';
import Restaurante from "../../../../models/Restaurante";
import middlewareAuth from '../../../../middlewares/auth';


dbConnect();

const handler = async(req, res) => {
    const{ method } = req;

    switch(method){
        case 'GET':
            try{
                const categoria = await Categoria.find().populate({ path: 'restaurante', model: Restaurante });
                if(!categoria){
                    return res.status(400).json({success: false});
                }

                return res.status(200).json({success: true, categoria: categoria});
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao obter categoria! ${error}`});
            }
            break;
        default:
            return res.status(400).json({success: false, message: "Requisição inválida"});
            break;
    }   
}
export default middlewareAuth(handler);