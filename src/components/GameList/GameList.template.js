export default function({ styles, numGames }) {
  const listTemplate = `<div class="${
    styles.gamesList
  }" id="games-list"></div>`;

  const emptyTemplate = `
      <div id="empty-list"  class="${styles.emptyListContainer}">

          <div class="${styles.emptyList}">
          
              <h1>Looks like there's nothing here, yet.</h1>
              <p>In the Kingdom you’ll find the best games to play in your browser, as well as our game apps.<br> 
              Play on your computer, mobile or tablet and simply sync your progress. <br>
              King games are easy to pick up, but hard to put down! So get ready to have fun and enter the Kingdom!</p>
              
              <button id="view-all-games-btn" class="${
                styles.emptyListBtn
              }">Browse the games</button>
          </div>

      </div>
`;

  return `${numGames > 0 ? listTemplate : emptyTemplate}`;
}
