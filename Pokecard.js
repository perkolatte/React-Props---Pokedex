function Pokecard(props) {
  const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`;
  const idNo = String(props.id).padStart(5, "0");
  const dexNo = String(props.id).padStart(3, "0");
  const level = Number(props.level) || 1;
  const hpMax = Math.max(1, level * 3);
  const hpCurrent = hpMax;
  const hpPercent = Math.min(
    100,
    Math.max(8, Math.floor((hpCurrent / hpMax) * 100))
  );
  const stats = {
    attack: Math.max(1, Math.floor(level * 1.8)),
    defense: Math.max(1, Math.floor(level * 1.7)),
    speed: Math.max(1, Math.floor(level * 1.6)),
    special: Math.max(1, Math.floor(level * 1.9)),
  };

  return (
    <div className="Pokecard">
      <div className="Pokecard-top">
        <div className="Pokecard-sprite">
          <img src={imgSrc} alt={props.name} />
        </div>
        <div className="Pokecard-summary">
          <div className="Pokecard-name">{props.name}</div>
          <div className="Pokecard-level">{level}</div>
          <div className="Pokecard-hp">
            <div className="Pokecard-hpbar">
              <div
                className="Pokecard-hpfill"
                style={{ width: `${hpPercent}%` }}
              />
            </div>
          </div>
          <div className="Pokecard-hptext">
            <span className="Pokecard-hpcurrent">{hpCurrent}</span>
            <span className="Pokecard-hpslash">/</span>
            <span className="Pokecard-hpmax">{hpMax}</span>
          </div>
          <div className="Pokecard-status">
            STATUS<span className="Pokecard-slash">/</span>OK
          </div>
        </div>
        <div className="Pokecard-no">{dexNo}</div>
        <div className="Pokecard-divider" aria-hidden="true" />
      </div>

      <div className="Pokecard-bottom">
        <div className="Pokecard-stats">
          <div className="Pokecard-stat">
            <div className="Pokecard-statlabel">ATTACK</div>
            <div className="Pokecard-statvalue">{stats.attack}</div>
          </div>
          <div className="Pokecard-stat">
            <div className="Pokecard-statlabel">DEFENSE</div>
            <div className="Pokecard-statvalue">{stats.defense}</div>
          </div>
          <div className="Pokecard-stat">
            <div className="Pokecard-statlabel">SPEED</div>
            <div className="Pokecard-statvalue">{stats.speed}</div>
          </div>
          <div className="Pokecard-stat">
            <div className="Pokecard-statlabel">SPECIAL</div>
            <div className="Pokecard-statvalue">{stats.special}</div>
          </div>
        </div>
        <div className="Pokecard-meta">
          <div className="Pokecard-type">
            <div className="Pokecard-metalabel">
              TYPE1<span className="Pokecard-slash">/</span>
            </div>
            <div className="Pokecard-metavalue">{props.type}</div>
          </div>
          <div className="Pokecard-type">
            {props.type2 ? (
              <>
                <div className="Pokecard-metalabel">
                  TYPE2<span className="Pokecard-slash">/</span>
                </div>
                <div className="Pokecard-metavalue">{props.type2}</div>
              </>
            ) : (
              <>
                <div className="Pokecard-metalabel">&nbsp;</div>
                <div className="Pokecard-metavalue">&nbsp;</div>
              </>
            )}
          </div>
          <div className="Pokecard-idno">
            <div className="Pokecard-metalabel">/</div>
            <div className="Pokecard-metavalue">{idNo}</div>
          </div>
          <div className="Pokecard-ot">
            <div className="Pokecard-metalabel">
              OT<span className="Pokecard-slash">/</span>
            </div>
            <div className="Pokecard-metavalue">Ash</div>
          </div>
        </div>
      </div>
    </div>
  );
}
