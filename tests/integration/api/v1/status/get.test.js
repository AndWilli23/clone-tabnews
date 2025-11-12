test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  const version = responseBody.dependencies.database.version;
  expect(version).toMatch(/^\d+\.\d+/);

  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(
    typeof responseBody.dependencies.database.max_connections,
  ).not.toBeNaN();

  expect(responseBody.dependencies.database.active_connections).toEqual(1);
  expect(
    typeof responseBody.dependencies.database.active_connections,
  ).not.toBeNaN();
});
