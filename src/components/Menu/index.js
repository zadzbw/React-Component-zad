/**
 * Created by zad on 17/1/16.
 */
import Menu from './Menu';
import SubMenu from './SubMenu';
import MenuItem from './MenuItem';
import MenuItemGroup from './MenuItemGroup';

import './Menu.less';

Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;
Menu.ItemGroup = MenuItemGroup;

export default Menu;
