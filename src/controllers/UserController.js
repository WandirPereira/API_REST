import User from '../models/User';

class UserController {
  async store(req, res) {
    const novoUser = await User.create({
      nome: 'Wandir',
      email: 'wandir2@gmail.com',
      passord: '123456',
    });
    res.json(novoUser);
  }
}

export default new UserController();
