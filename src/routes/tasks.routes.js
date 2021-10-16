import {Router} from 'express';
import * as taskController from '../controllers/task.controller';

const router = Router();

router.get('/', taskController.findAllTasks);
router.get('/done', taskController.findAllDoneTasks);
router.get('/:id', taskController.findOneTask);
router.post('/', taskController.createTask);
router.delete('/:id', taskController.deleteTask);
router.put('/:id', taskController.updateTask);

export default router;
