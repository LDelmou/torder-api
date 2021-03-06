import dbConnect from "../../../utils/dbConnect"; 
import Cliente from '../../../models/Cliente';
import middlewareAuth from '../../../middlewares/auth';

dbConnect();

const handler = async(req, res) => {
    const{ query: { id }, method } = req;

    switch(method){
        case 'GET':
            try{
                const cliente = [await Cliente.findById(id)];
                if(!cliente){
                    return res.status(400).json({success: false});
                }

                return res.status(200).json({success: true, cliente: cliente});
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao obter cliente! ${error}`});
            }
            break;
        case 'PUT':
            try{
                const cliente = await Cliente.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if(!cliente){
                    return res.status(400).json({success: false, message: `Falha ao atualizar cliente!`});
                }

                return res.status(200).json({success: true, cliente: cliente});
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao atualizar cliente! ${error}`});
            }
            break;
        case 'DELETE':
            try{
                const deletedCliente = await Cliente.deleteOne({ _id: id});
                if(!deletedCliente){
                    return res.status(400).json({success: false, message: `Falha ao remover cliente!`});
                }

                return res.status(200).json({success: true, cliente: {}});
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao remover cliente! ${error}`});
            }
            break;
        default:
            return res.status(400).json({success: false, message: "Requisição inválida"});
            break;
    }   
}

export default middlewareAuth(handler);