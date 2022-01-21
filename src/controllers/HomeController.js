import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create({
      nome: 'Wandir',
      sobrenome: 'Pereira Filho',
      email: 'wandir@gmail.com',
      idade: 56,
      peso: 115,
      altura: 1.9,
    });
    res.json(novoAluno);
  }
}

export default new HomeController();
