import bcrypt from "bcrypt"
const saltRounds = 14;
export const hashPassword = async (password)=>{
    const hashed = await bcrypt.hash(password, saltRounds);
    console.log(hashed);
    return hashed;
}

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}