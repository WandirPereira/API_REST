import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const { id, nome, email } = novoUser;
      // return res.json(novoUser);
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Index
  async index(req, res) {
    try {
      // const users = await User.findAll();
      const users = await User.findAll({ attributes: ['id', 'nome', 'email', 'updated_at'] });
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  // Index
  async show(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          erros: ['ID não enviado!'],
        });
      }

      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(400).json({
          erros: ['Usuário não existe!'],
        });
      }

      const { id, nome, email } = user;
      return res.json({ id, nome, email });

      // return res.json(user);
    } catch (e) {
      return res.json(null);
    }
  }

  // Update
  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          erros: ['Usuário não existe!'],
        });
      }

      const novosdados = await user.update(req.body);
      const { id, nome, email } = novosdados;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.json(null);
    }
  }

  async delete(req, res) {
    try {
      // const { id } = req.params;
      // if (!req.params.id) {
      //   return res.status(400).json({
      //     erros: ['ID não enviado!'],
      //   });
      // }

      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          erros: ['Usuário não existe!'],
        });
      }

      await user.destroy();
      return res.json(null);
    } catch (e) {
      return res.json(null);
    }
  }
}

export default new UserController();
