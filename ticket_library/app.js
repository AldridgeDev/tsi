const ticketIndex = document.getElementById('ticketIndex');
const searchBar = document.getElementById('searchBar');
let ticketTypes = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredTickets = ticketTypes.filter( ticket => {
        let tagNames = JSON.stringify(ticket.tags);
        return (
            ticket.ticketName.toLowerCase().includes(searchString) || tagNames.includes(searchString)
        );
    });
    displayTickets(filteredTickets);
});

const loadTickets = async () => {
    try {
        const res = await fetch('https://raw.githubusercontent.com/AldridgeDev/tsi/master/ticket_data.json');
        ticketTypes = await res.json();
        displayTickets(ticketTypes);
    } catch (err) {
        console.error(err);
    }
};

const displayTickets = (tickets) => {
    const htmlString = tickets
        .map((ticket) => {
            return `
            <div class="ticket">
                <h2>${ticket.ticketName}</h2>
                <span class="tag">${ticket.tags}</span>
            </div>
        `;
        })
        .join('');
    ticketIndex.innerHTML = htmlString;
};

loadTickets();