import React, { useState, useEffect } from "react";
import List from "./List";
import ListForm from "./ListForm";
// import motion from framer
import { motion } from "framer-motion";

function ShoppingList() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem("items"));
        if (storedItems) setItems(storedItems);
    }, []);

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
    }, [items]);

    const addListItem = (item) => {
        if (!item.text || /^\s*$/.test(item.text)) {
            return;
        }
        const newListListItem = [item, ...items];
        setItems(newListListItem);
    };

    const removeItem = (id) => {
        setItems((previousItems) =>
            [...previousItems].filter((item) => item.id !== id)
        );
    };

    return (
        <div>
            {/* Add motion for our h1 */}
            {/* animate - takes in an object and use key value pairs to describe how you want the animation to animate */}
            {/* transition - is the in between state of initial(start) and animate(end) *}
            {/* duration - 1 second of being displayed  */}
            {/* intial - is a prop in how we want the animation to begin, opacity 0 is we don't want it visible initially when the page loads */}
            <motion.h1
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                Shopping List
            </motion.h1>
            <ListForm onSubmit={addListItem} />
            {/* in List component, will add a prop called reOrderList and inside of reOrderList will pass in setItems */}
            <List items={items} removeItem={removeItem} reOrderList={setItems} />
        </div>
    );
}

export default ShoppingList;
