import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Register new company
export const registerCompany = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      address,
      companyCategory,
      contractorGrade,
      rentalCategories,
    } = req.body;

    // Check existing email
    const existing = await prisma.company.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: "Email already in use" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save company
    const company = await prisma.company.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        companyCategory,
        contractorGrade: companyCategory === "CONSTRUCTION" ? contractorGrade : null,
        rentalCategories: companyCategory === "RENTAL" && rentalCategories
          ? rentalCategories.join(",")
          : null,
      },
    });

    // Create JWT token
    const token = jwt.sign({ id: company.id, email }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ token, company });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

// Login company
export const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find company by email
    const company = await prisma.company.findUnique({ where: { email } });
    if (!company) return res.status(400).json({ error: "Invalid email or password" });

    // Check password
    const valid = await bcrypt.compare(password, company.password);
    if (!valid) return res.status(400).json({ error: "Invalid email or password" });

    // Create token
    const token = jwt.sign({ id: company.id, email }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, company });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
};
