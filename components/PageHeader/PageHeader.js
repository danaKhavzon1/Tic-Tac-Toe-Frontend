import classes from "./PageHeader.module.css";

export default function PageHeader() {
  return (
    <>
      <div className={`${classes["page-header-container"]}`}>
        <div className={`${classes["page-header-wrapper"]}`}>
          <div className={`${classes["page-header"]}`}>
            <h1 className={`${classes["page-header-content"]}`}>
              Tic Tac Toe Palooza!
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
