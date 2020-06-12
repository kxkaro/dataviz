import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    barSet: {
        padding: '8px 0',
        width: '100%',
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontSize: '10pt',
        boxSizing: 'border-box',
        display: 'inline-block',
        lineHeight: '10pt',
    },
    barRow: {
        boxSizing: 'border-box',
        display: 'block',
        padding: '3px 0',
        minHeight: '32px',
        clear: 'both',
    },
    barLabel: {
        boxSizing: 'border-box',
        paddingRight: '15px',
        marginTop: '3px',
        width: '44%',
        display: 'inline-block',
        float: 'left',
        textAlign: 'right',
        verticalAlign: 'center',
    },
    barLabel2: {
        fontWeight: 'bolder',
        width: '6%',
        minWidth: '45px',
        paddingRight: '10px',
        textAlign: 'center',
    },
    list: {
        listStyle: 'none',
        margin: '0',
        padding: '0',
        display: 'inline-block',
        position: 'relative',
        boxSizing: 'border-box',
        paddingInlineStart: '10px',
        width: '40%',
    },
    bar: {
        border: '2px solid #000',
        marginTop: '2px',
        height: '14px',
        content: '',
        lineHeight: '16px',
        textAlign: 'right',
        paddingTop: '1px',
        color: '#005999',
    }
}));

const HorizontalBarChartRespWidth = ({ data, color }) => {
    const classes = useStyles();
    const max = Math.max(...data.map(row => row.value))

    return (
        <div className={classes.barSet} style={{ color: color }}>
            {data.sort((a, b) => b.value - a.value)
                .map((row, i) =>
                    <div key={`chart-bar-${i}`} className={classes.barRow}>
                        <div className={classes.barLabel}>{row.category}</div>
                        <div className={`${classes.barLabel} ${classes.barLabel2}`}>{row.value}</div>
                        <ul className={classes.list}>
                            <li style={{ width: `${row.value / max * 100}%`, backgroundColor: color, borderColor: color }} className={classes.bar}></li>
                        </ul>
                    </div>

                )}
        </div>
    )
};

export default HorizontalBarChartRespWidth;
