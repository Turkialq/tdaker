import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";
import { validateRequest, requireAuth } from "@tdaker/common";
import { NotFoundError } from "@tdaker/common";

const router = express.Router();

router.get(
  "/api/tickets/:id",
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const result = await Ticket.findById(req.params.id);
    if (!result) {
      throw new NotFoundError();
    }
    res.send(result);
  }
);

export { router as showTicketRouter };
