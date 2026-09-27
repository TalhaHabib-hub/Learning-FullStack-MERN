import "../index.css";
import ItemsSummary from "../components/ItemsSummary";
import BagItems from "../components/bagsItem";
import { useSelector } from "react-redux";

const Bag = () => {
  const bag = useSelector((store) => store.bag);
  const itemInHome = useSelector((store) => store.items);
  const item = itemInHome.filter((itemEach) => bag.includes(itemEach.id));
  return (
    <main className="bag-page">
      <div className="bag-heading">
        <div>
          <p className="bag-eyebrow">TalOn checkout</p>
          <h1>Your bag</h1>
        </div>
        <span>
          {bag.length} {bag.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="bag-layout">
        <aside className="bag-summary" aria-label="Order summary">
          <ItemsSummary />
        </aside>
        <section className="bag-items-list" aria-label="Items in your bag">
          {item.length === 0 ? (
            <div className="empty-bag">
              <p className="empty-bag-icon" aria-hidden="true">
                +
              </p>
              <h2>Your bag is waiting</h2>
              <p>Discover something you love and it will appear here.</p>
            </div>
          ) : (
            item.map((each) => <BagItems key={each.id} item={each} />)
          )}
        </section>
        
      </div>
    </main>
  );
};

export default Bag;
