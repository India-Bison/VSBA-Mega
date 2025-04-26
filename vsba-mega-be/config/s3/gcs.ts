const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
    projectId: 'ict-recurring',
    credentials: {
        client_email: 'ict-recurring-bucket-access@ict-recurring.iam.gserviceaccount.com',
        private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDA6Ty71N/zaq4V\nmtodH544F78/EWVmzaKOo7Kg/+12SLIi17mkM7LLjFCr2b5ZiEFyQdYijNa7QepP\n3VV//vYqQ6WF27Jnj/FIJ1q+8UzkQPK77rTd0P53UDo6Gl1r1dhEBdXG4LbjnCT1\nP+K74N6P2HlgL6DqcZ+i02XcT8UnmQWMDuacJG1YD2DJxIG5AwYlQ5TCjLXsdnNi\n1WE2bQH6HRHL1VUbJkNte4On9Hm519vtxyv0HoDc0Wor5eEs0dSkIY4aZVqm/6A1\n0+wsg+GHD6j/bTTHb9EsX/lnko2+dLmoR6mekan5S1IMWHHbBrWC+bzLequDQai2\nfmrPeRuLAgMBAAECggEAKOhs3iH2ua4qK1+ymBFv4lI61ntwZtv9eEUDaLvM1dP1\nnojjj4v9AsgHBWI/yMmpozqN17bJBF2me/giHOnqtqywqZGco/R0xIm/5xTRaufQ\n8YRdq1oZ1CBZsJ+NpwPqgAZCvpFBh0PB3JYHFTNKzvMnTfvbokulAAjXJWBvHQWp\nyrbYR0tsOLyXPjuuADrFQ5gHabh7Gw4GYkJ+b4nKLlKgUiC6+dAvu1pQl+vUjdIE\n3r7RIgSdsX1yRUmM+sp7N6NwU/ONsIcMBs4ih8iVcePaEYl3csT7j2QAz/S52o9m\nu63Wej5SvZfu8JK5sv8nfTMQHtZruYpe7VJZkZQE5QKBgQD3TfBzhbYv7iLk+RO/\nQXV5RfeFYwnvDcBERwCveEutDH9BAmYFLIax7KnaByMDqUWZlWz3cPegwhOWnEeX\nzwtUgW8RV51NptmzOg1ixukLjqgYjgRQoc3/e9mDCLxnT+WApcHP24zCPSY1Q0HG\nZ00Q1S/PXDvvb0v1wNW/I8yMfwKBgQDHsa/oZYGnpsnvrLdsb3O75K4C6C8toOYk\no/0iEh+3RgnuuY4qMANs7ayvLXqp8+X6KMJk5/2gufweuM0BZmf5pQnR5x5EBXej\nbs8frGlTiOGCXM5ALlsDdtvDrFTJMNrjl5cP0MO7xphvEfK3ioOdsOHqFXZfdcMW\n0GORW65a9QKBgEGG6EBj3ItEqQBMsxvJJ2xTyqsQO/CYjypIOflEgaC/n/REw215\nh9MbJ0I7A98Tefqg6jeCOkrhQbl1fU7PMGxaw2gv8+FAZYykxCk5FUTXrtiawK/w\nv5mDYnXi2bDyLZhx0zHVNa298CLKyGHeuz/LjRh/ku31aoYaa0hzHt7XAoGBAIwY\nCxmVxLzyFO8xE0lecyoZBz8A1sBDBdIkvdxeLKPt3d/9i0/reSu9Hg2TcV+zvN6g\nI6iY3GUatVZ0PVZDGqSX9OiuJJyB3WnpviMxWH8DI3nKU+PQ4YbvpsOCrcSropRS\nb+bnhbnBXIVnaQj8gtNpGUSYo//aZPAnaAK89/fVAoGBAK+SDZ5AG9aOjWkEq8Q0\nm0zi6I+0f2I1e3fXunjYl1uWVXU7XRwRIRs0AnR/Cnditk3rbsw7cYfia6m/xMFT\noQ2gg9nZaYJ6WHlpv2j1ypuZ4SPeNQfNo7E0g9hN2XfCyzuKoCpFIwVrakzHsc5u\np5xkNaAmUXHd3s+mYYODIlO6\n-----END PRIVATE KEY-----\n'
    }
});

const bucketName = 'ict-recurring-media';
const bucket = storage.bucket(bucketName);

export default bucket