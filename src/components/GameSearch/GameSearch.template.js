export default function({ styles }) {
  const gameSearch = `  
   <div class="${styles.btnWrapper}">
      <div>
        <button id="show-all-btn" class="${styles.heroBtn}">All games</button>
      </div>

      <div>
        <button id="show-fav-btn" class="${styles.heroBtn}">❤️ My games</button>
      </div>
   </div>

   <div>
    <input type="text" placeholder="Search Game" id="search-input" class="${
      styles.searchInput
    }" />
   </div>
`;

  return gameSearch;
}
