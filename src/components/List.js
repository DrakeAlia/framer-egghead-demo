import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";
// import AnimatePresence and Reorder
import { AnimatePresence, Reorder } from "framer-motion";

// create an object called itemVariants
// hidden is the variant variable
// the tranistion you make that part of whatever variant label that you want to animate to. You don't make it a seperate variant label
const itemVariants = {
    hidden: { opacity: 0 },
    // a function that returns an object with a dynamic value called custom
    visible: (custom) => ({
        opacity: 1,
        // we want each of these items to animate one at a time
        transition: { delay: custom }
    })
};

// use destructing to get access reOrderList that we have in our ShoppingList component
function List({ items, removeItem, reOrderList }) {
    return (
        <>
            {/* replace motion with Reorder */}
            {/* By default the Reorder.group component is a UL tag under the hood but you can make it an OL tag if you want  */}
            <Reorder.Group
                // the Reorder needs a axis prop, set axis to y, so the reordering of our list is bound to the y-axis
                axis="y"
                // another required prop for Reorder is values,
                // inside of values you want to pass in array which represents the items that you want to Reorder, this case the item state variable
                values={items}
                // the final required prop for Reorder component is onReorder, onReorder we are taking a function that will update the state of the array
                // that you pass into the values prop. Pass in reOrderList
                onReorder={reOrderList}
                className="ul-portal"
                style={{ display: "flex", flexDirection: "column", flex: 2 }}
            >
                {/* wrap AnimatePresence around the item that we to animate out of the DOM */}
                <AnimatePresence>
                    {/* Our list item */}
                    {/* replace motion.li with Reorder.Item, by default with Reorder everything can be drag without having to add the drag prop */}
                    {items.map((item, index) => (
                        <Reorder.Item
                        // Reorder requires a value prop, the value prop is for framer motion to keep track of the 
                        // item that is being dragged in the list
                            value={item}
                            className="list-row"
                            // when your using AnimatePresence you want to make sure that you have a key prop on what your animating
                            // so for the key we set it to item.id
                            key={item.id}
                            // add the layoutId prop in order to have a smother layout for our list items
                            // we want framer motion to keep track of the layout of the id of each item(item.id) that we're adding
                            layoutId={item.id}
                            // pass in the variant prop, the variant that we want to use
                            variants={itemVariants}
                            // add initial prop with a string of hidden
                            initial="hidden"
                            // when it animates we want it to be visible
                            animate="visible"
                            // with AnimatePresence we can use the exit prop which allows the element to actually be removed from 
                            // the DOM and allow it to be animated
                            exit="pre"
                            // add custom prop saying that will go through each item that we have listed and 
                            // multiplied by 0.2 seconds. So when each item is animating onto the DOM each item in our list will animate .2 seconds
                            custom={(index + 1) * 0.2}
                            // whileHover prop to let the user know that your hovering over an item
                            whileHover={{ scale: 1.05 }}
                            // whileTap prop so when the clicks on the item, it get slightly bigger
                            whileTap={{ scale: 1.1 }}
                        >
                            <div>{item.text}</div>
                            <div className="icons">
                                <RiCloseCircleLine
                                    onClick={() => removeItem(item.id)}
                                    className="delete-icon"
                                />
                            </div>
                        </Reorder.Item>
                    ))}
                </AnimatePresence>
            </Reorder.Group>
        </>
    );
}

export default List;
