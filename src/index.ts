import '@services/dotenv'
import '@services/db'
import app from './app'

console.clear()
const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT} 🚀`))
