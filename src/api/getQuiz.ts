export default async function getQuiz() {
  const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple', {
    method: 'GET',
  });

  return response.json();
}
