import { Request, Response } from 'express';
import { generateEmail } from '../services/gemini.service';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middleware/auth.middleware';

export const generate = async (req: Request, res: Response) => {
    try {
        const { audience, product, valueProps, tone, length, cta, additionalReqs } = req.body;

        if (!audience || !product || !valueProps) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }

        const emailContent = await generateEmail({
            audience,
            product,
            valueProps,
            tone: tone || 'Professional',
            length: length || 'Medium',
            cta: cta || 'Book a call',
            additionalReqs
        });

        res.status(200).json(emailContent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to generate email' });
    }
};

export const saveEmail = async (req: AuthRequest, res: Response) => {
    try {
        const { subject, body, tone, targetAudience, campaignId } = req.body;
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const email = await prisma.email.create({
            data: {
                subject,
                body,
                tone,
                targetAudience,
                userId,
                campaignId
            }
        });

        res.status(201).json(email);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to save email' });
    }
};

export const getEmails = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const emails = await prisma.email.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });

        res.status(200).json(emails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch emails' });
    }
};
