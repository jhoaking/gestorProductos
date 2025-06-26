import { PORT } from "./config";
import { app } from "./app";
import { start } from "./graphql/graphIndex";

start(app).then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🚀 GraphQL listo en http://localhost:${PORT}/graphql`);
  });
});

