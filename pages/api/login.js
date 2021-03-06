import dbConnect from "../../utils/dbConnect"; 
import Usuario from '../../models/Usuario';
import bcrypt from 'bcrypt';
import gerarToken from './gerarToken';

dbConnect();

export default async(req, res) => {
    if(!req.body){
        return res.status(400).json({message: `Erro no login!`});
    }
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({email}).select('+senha');

    if(!usuario)
        return res.status(400).json({message: `Usuário não encontrado!`});

    if(!await bcrypt.compare(senha, usuario.senha))
        return res.status(400).json({message: `Senha inválida!`});
        
    
    usuario.senha = undefined;
    if(usuario.cliente != undefined && usuario.cliente != null)
        res.send({usuario, token: gerarToken({ idUsuario: usuario.id, idCliente: usuario.cliente._id})});
    if(usuario.restaurante != undefined && usuario.restaurante != null)
        res.send({usuario, token: gerarToken({ idUsuario: usuario.id,idRestaurante: usuario.restaurante._id})});
}