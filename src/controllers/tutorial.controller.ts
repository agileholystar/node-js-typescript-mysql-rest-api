import { NextFunction, Request, Response } from "express";
import { tutorialRepository } from "../repositories/tutorial.repository";
import Tutorial from "../models/tutorial.model";

export default class TutorialController {
  async create(req: Request, res: Response, next: NextFunction) {
    const tutorial: Tutorial = req.body;

    if (!tutorial.id) {
      next(new Error("id is missing"));
    } else {
      try {
        const result = await tutorialRepository.create(tutorial);
        res.status(200).send(result);
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: "create error" });
      }
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const result = await tutorialRepository.findAll();
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }

  async findAllPublished(req: Request, res: Response) {
    try {
      const result = await tutorialRepository.findAll(true);
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }

  async findOne(req: Request, res: Response) {
    const tutorialId: number = Number.parseInt(req.params.id);
    console.log(tutorialId);
    const result = await tutorialRepository.findOne(tutorialId);

    res.status(200).send(result);
  }

  // 전체 tutorial을 입력받고 tutorial.id를 기준으로 input 데이터로 다 새로쓴다.
  // TODO 근데 만약 없는 id가 들어오면 어떻게 될까?
  async update(req: Request, res: Response) {
    const body: Tutorial = req.body;

    await tutorialRepository.update(body);

    res.sendStatus(200);
  }

  async delete(req: Request, res: Response) {
    const id: number = Number.parseInt(req.params.id);
    try {
      const affectedRows = await tutorialRepository.delete(id);
      if (!affectedRows) {
        res.status(500).send({
          message: "Maybe, the tutorial doesn't exist.",
        });
      } else {
        res.sendStatus(200);
      }
    } catch (error) {}
  }

  async deleteAll(req: Request, res: Response) {}
}
