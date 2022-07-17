export default {
    expanded: true,
    text: 'All',
    children: [{
        text: 'Главная',
        iconCls: 'x-fa fa-home',
        leaf: true
    },{
        text: 'МП',
        iconCls: 'x-fa fa-home',
        children: [{
            text: 'Кровь',
            iconCls: 'x-fa fa-inbox',
            children: [{
                text: 'Возможности',
                iconCls: 'x-fa fa-inbox',
                leaf: true
            }]
        }]
    }]
};