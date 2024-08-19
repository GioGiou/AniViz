<script>
    import { onMount } from "svelte"
    import PapaParse from 'papaparse';
    import { base } from '$app/paths'
	import * as d3 from "d3"
    import {Datatable,functionCreateDatatable,PaginationItems,RowsPerPage,Search,Sort} from 'svelte-datatables-net';
    const columns = [
        "Name","Number of episode","Genres"
    ];
    let i = $state(1);
    /**@type String*/
    let data;
    /**@type any*/
    let handler;
    let rows;
    /**@type any[]*/
    let dataT = $state([]);
    let dataTable= $state();
    const readData =async function () {
        const rez = await fetch("/animes.csv");
        data  = await rez.text();
        // @ts-ignore
        let temp= await PapaParse.parse(data,{header:true});
        dataT = temp.data;
        console.log(dataT[1]);
        dataTable=functionCreateDatatable({
                parData: dataT,
                parSearchableColumns: ['title', 'genres'],
                parRowsPerPage: '10',
                parSortBy: 'city',
                parSortOrder: 'ascending',
                parSearchString: '',
            });
    }
    
    
</script>
<!-- svelte-ignore event_directive_deprecated -->
<button on:click={()=>{alert(dataT)}}>Test</button>

{#await readData()}
	READING DATA...
{:then}
<Datatable bind:propDatatable={dataTable}>
    <p>
		<span>Search:</span>
		<Search propPlaceholder="Type here..." />
	</p>

	<p>
		<RowsPerPage>
			<option value="5">5</option>
			<option value="10">10</option>
			<option value="20">20</option>
			<option value="30">30</option>
			<option value="all">ALL</option>
		</RowsPerPage>
		<span>RESULTS PER PAGE</span>
	</p>
	<p>
		<PaginationItems
			propTag="button"
			propDisabledStyle="background: darkgrey;"
			propActiveStyle="background: blue;color:white;"
		/>
	</p>
    <table style="width:100%">
        <thead>
            <tr>
                <th>
					<Sort propDatatable={dataTable} propColumn={'name'}>Anime name</Sort>
				</th>
                <th>Episode number</th>
                <th>
					<Sort propDatatable={dataTable} propColumn={'genes'}>Genres</Sort>
				</th>
            </tr>
        </thead>
        <tbody>
			{#each dataTable.arrayData as row}
				<tr>

					<td>{row.title}</td>
					<td>{row.episodes}</td>
					<td>{row.genres}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</Datatable>
<p>
	SHOWING {dataTable.numberFirstRow} TO {dataTable.numberLastRow} OF {dataTable
		.arraySearched.length} ITEMS
</p>

{/await}
<div>


</div>


        

