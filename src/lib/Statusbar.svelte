<script lang="ts">
	export let mem = 0;

	function convertDataUnit(size, sourceUnit = "Byte", targetUnit = "YB") {
		let i;
		const units = {
			bit: 0,
			Byte: 1,
			KB: 2,
			MB: 3,
			GB: 4,
			TB: 5,
			PB: 6,
			EB: 7,
			ZB: 8,
			YB: 9,
		};

		if (units[sourceUnit] <= units[targetUnit]) {
			for (i = units[sourceUnit]; size >= 1024; i++) {
				if (i === 0) {
					size /= 8;
				} else {
					size /= 1024;
				}
			}
		} else {
			for (i = units[sourceUnit]; i > units[targetUnit]; i--) {
				if (i === 1) {
					size *= 8;
				} else {
					size *= 1024;
				}
			}
		}
		const factor = Math.pow(10, 2);
		const tempNumber = size * factor;
		const roundedTempNumber = Math.round(tempNumber);
		return roundedTempNumber / factor + ' ' + Object.keys(units)[i];
	}

</script>


<div>gespeicherte Daten im Browser:<span>&nbsp;{convertDataUnit(mem)}&nbsp;</span></div>

<style lang="scss">
  @import "src/vars.scss";
  div{
    display: flex;
    padding: 5px;
    height: 100%;
    align-items: center;
    justify-content: flex-end;
    color: $icon-clicked;
  }
    span{
      font-weight: bold;
    }
</style>