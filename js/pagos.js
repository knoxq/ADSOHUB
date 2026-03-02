let selectedPlan = '';

  function selectPlan(plan, price) {
    selectedPlan = `${plan} - $${price.toLocaleString()}`;
    document.getElementById('planText').textContent = selectedPlan;

    document.querySelectorAll('.plan').forEach(p => {
      p.classList.remove('border-red-600');
      p.classList.add('border-gray-700');
    });

    event.currentTarget.classList.add('border-red-600');
  }

  document.getElementById('paymentForm').addEventListener('submit', e => {
    e.preventDefault();

    const name = nameInput();
    const card = cardInput();
    const date = dateInput();
    const cvv = cvvInput();

    if (!name || !card || !date || !cvv || !selectedPlan) {
      document.getElementById('error').classList.remove('hidden');
      return;
    }

    document.getElementById('error').classList.add('hidden');
    document.getElementById('modal').classList.remove('hidden');
    document.getElementById('modal').classList.add('flex');
  });

  function closeModal() {
    document.getElementById('modal').classList.add('hidden');
  }

  const nameInput = () => document.getElementById('name').value.trim();
  const cardInput = () => document.getElementById('card').value.trim();
  const dateInput = () => document.getElementById('date').value.trim();
  const cvvInput = () => document.getElementById('cvv').value.trim();