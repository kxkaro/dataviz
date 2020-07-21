import React from 'react';
import { useStyles } from '../styles/main';
import { LinearBuffer, Empty } from '../components/Loading';
import { Container, Grid, Typography, } from '@material-ui/core';
import HorizontalBarChart from '../components/charts/HorizontalBarChart'
import VerticalBarChart from '../components/charts/VerticalBarChart'
import BarChartRace from '../components/charts/BarChartRace'
import HorizontalBarChartRespWidth from '../components/charts/HorizontalBarChartRespWidth'
import moment from 'moment';
import PALETTES from '../constants/colors';
import ChartCard from '../components/ChartCard';

// TODO: create a file with dimension names mapping
const Dashboard = ({ data }) => {
    const classes = useStyles();
    const colPal = Object.values(PALETTES.GREEN_ORANGE);
    return (
        <div style={{ backgroundColor: colPal[0], minHeight: '100vh'}}>
            <Container maxWidth="lg">
                {!data || data.length === 0 ? 
                    <LinearBuffer /> : (
                        <Grid
                            container
                            spacing={2}
                        // direction="row"
                        // justify="space-evenly"
                        // alignItems="stretch"
                        >
                            
                            <Grid item xs={12}>
                                <Typography variant="h5" style={{ color: "#FFF" }}>
                                    Ultracool dashboard with some data
                            </Typography>
                                <Typography variant="subtitle2" style={{ color: "#FFF" }}>
                                    ...well, at least the beginning of an ultracool dashboard :3
                            </Typography>
                            </Grid>
                            
                            <Grid container item xs={12} md={6}>
                                <Grid item xs={12} className={classes.spacingBottom}>
                                    <ChartCard
                                        title="Racing divisions"
                                        subtitle="Values are in EUR"
                                        color={colPal[0]}
                                        content={<BarChartRace
                                            data={data.map(row => ({
                                                date: new Date(`${row.year.key}-${row.month.key}-01`),
                                                name: row.division.text,
                                                category: row.division.text,
                                                value: row.sales.value / 1000,
                                            }))}
                                            size={{ width: 500, height: 250 }}
                                        />}
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.spacingTop}>
                                    <ChartCard
                                        title="Sales by calendar month"
                                        subtitle="Values are in EUR"
                                        color={colPal[0]}
                                        content={<VerticalBarChart
                                            data={data.sort((a, b) => a.month.key - b.month.key)
                                                .map(row => ({
                                                    category: row.month.text,
                                                    value: row.sales.value
                                                }))}
                                            size={{ width: 500, height: 250 }}
                                            resize="responsive"
                                        />}
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <ChartCard
                                    title="Ordered quantity by country"
                                    subtitle="Values are in pieces"
                                    color={colPal[0]}
                                    content={<HorizontalBarChart
                                        data={data.sort((a, b) =>
                                            a.country.text < b.country.text ? -1
                                                : (a.country.text > b.country.text ? 1 : 0))
                                            .map(row => ({ category: row.country.text, value: row.qty.value }))}
                                        size={{ width: 350, height: 600 }}
                                        resize="responsive"
                                    />}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <ChartCard
                                    title="Ordered quantity by country-division-month"
                                    subtitle="Values are in pieces"
                                    description={<span>
                                        This one adjusts bar width responsively to container width. Stolen from the Stack Overflow survey result webpage. 
                                        <i className="user secret icon" href="/" />
                                        </span>}
                                    color={colPal[0]}
                                    content={<HorizontalBarChartRespWidth
                                        data={data.map(row => ({ category: `${row.country.text} - ${row.division.text} - ${row.month.text}`, value: row.qty.value }))}
                                        color={colPal[0]}
                                    />}
                                />
                            </Grid>
                        </Grid>
                    )}
            </Container>
        </div>
    )
};

export default Dashboard;