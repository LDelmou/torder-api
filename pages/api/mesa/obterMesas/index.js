import dbConnect from "../../../../utils/dbConnect"; 
import Mesa from '../../../../models/Mesa';
import Restaurante from "../../../../models/Restaurante";
import middlewareAuth from '../../../../middlewares/auth';


dbConnect();

const handler = async(req, res) => {
    const{ method } = req;

    switch(method){
        case 'GET':
            try{
                const mesa = await Mesa.find().populate({ path: 'restaurante', model: Restaurante });
                if(!mesa){
                    return res.status(400).json({success: false});
                }

                return res.status(200).json({success: true, mesa: mesa});
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao obter mesa! ${error}`});
            }
            break;
        default:
            return res.status(400).json({success: false, message: "Requisição inválida"});
            break;
    }   
}
export default middlewareAuth(handler);