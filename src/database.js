import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('menu_items.db')

export const dropMenuItemsTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            'DROP TABLE menu_items',
            [],
            (txObj, resultSet) => {
                console.log('Dropped menu items table');
            },
            (txObj, error) => {
                console.log('Error dropping menu items table: ', error);
            }
        );
    });
}
export const createMenuItemsTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS menu_items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, price TEXT NOT NULL, category TEXT NOT NULL, image TEXT NOT NULL, description TEXT NOT NULL)',
        )
    })
}

export const insertMenuItem = (item) => {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO menu_items (name, price, category, image, description) VALUES (?, ?, ?, ?, ?)',
            [item.name, item.price, item.category, item.image, item.description],
            (txObj, resultSet) => {
                console.log('Menu item added with ID: ', resultSet.insertId);
            },
            (txObj, error) => {
                console.log('Error adding menu item: ', error);
            }
        );
    });
};

export const fetchMenuItems = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM menu_items',
                [],
                (txObj, { rows: { _array } }) => {
                    resolve(_array)
                },
                (txObj, error) => {
                    reject(error)
                    console.log("Error fetching menu items", error)
                }
            )
        })
    })
}
