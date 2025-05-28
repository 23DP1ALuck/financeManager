import { z } from 'zod';

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    username: z.string().min(5)
});
export default schema;