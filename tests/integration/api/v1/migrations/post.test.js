import database from "infra/database";

beforeAll(cleanDatabase)

async function cleanDatabase() {
  await database.query("DROP schema public cascade; CREATE schema public")
}

test("POST to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);

  for (let i = 0; i < responseBody.length; i++) {  
    const migrationPath = responseBody[i].path;  

    const migrationName = responseBody[i].name
    expect(migrationPath).toBe(`infra/migrations/${migrationName}.js` );
    expect(migrationPath).toBeDefined();
  }
  
  const migrationsRowCountInpgmigrations = await database.query('SELECT * FROM pgmigrations');
  expect(migrationsRowCountInpgmigrations.rowCount).toEqual(responseBody.length);

});
