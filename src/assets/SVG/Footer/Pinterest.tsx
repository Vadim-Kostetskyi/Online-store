const Pinterest  =  ({className}:{className: string}): JSX.Element => {
  return (
    <button>
      <svg
        className={className}
        viewBox="0 0 32 32"
      >
        <path fill="#212121" d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16c-8.837 0-16-7.163-16-16s7.163-16 16-16z"></path>
        <path fill="#fdfdfd" d="M15.996 6.4c-5.307 0-9.596 4.296-9.596 9.596 0 4.067 2.527 7.543 6.097 8.941-0.087-0.758-0.158-1.927 0.032-2.756 0.174-0.75 1.121-4.77 1.121-4.77s-0.284-0.577-0.284-1.422c0-1.335 0.774-2.33 1.738-2.33 0.821 0 1.216 0.616 1.216 1.351 0 0.821-0.521 2.053-0.798 3.199-0.229 0.956 0.482 1.738 1.422 1.738 1.706 0 3.017-1.801 3.017-4.391 0-2.298-1.651-3.902-4.012-3.902-2.733 0-4.336 2.046-4.336 4.162 0 0.821 0.316 1.706 0.711 2.188 0.079 0.095 0.087 0.182 0.063 0.276-0.071 0.3-0.237 0.956-0.269 1.090-0.040 0.174-0.142 0.213-0.324 0.126-1.185-0.569-1.927-2.322-1.927-3.728 0-3.025 2.196-5.805 6.342-5.805 3.325 0 5.916 2.369 5.916 5.544 0 3.309-2.085 5.971-4.976 5.971-0.971 0-1.888-0.506-2.196-1.106 0 0-0.482 1.832-0.6 2.283-0.213 0.837-0.798 1.88-1.193 2.519 0.9 0.276 1.848 0.427 2.843 0.427 5.3 0 9.596-4.297 9.596-9.596-0.008-5.308-4.304-9.604-9.604-9.604z"></path>
      </svg>
    </button>
  )
}

export default Pinterest