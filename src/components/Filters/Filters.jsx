import { useForm, Controller } from "react-hook-form";
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import { formatISO } from 'date-fns';

const Filters = ({ setPage, setCity, setCountryCode, setStateCode, setStartDateTime, setEndDateTime }) => {
  const { control, register, reset, handleSubmit } = useForm({
    defaultValues: {
      city: '',
      countryCode: '',
      stateCode: '',
      startDateTime: '',
      endDateTime: '',
    }
  });

  const onSubmit = (data) => {
    setPage(1);
    setCity(data.city);
    setCountryCode(data.countryCode);
    setStateCode(data.stateCode);
    setStartDateTime((data.startDateTime) ? formatISO(new Date(data.startDateTime)) : '');
    setEndDateTime((data.endDateTime) ? formatISO(new Date(data.endDateTime)) : '');
    reset();
  };

  return (
    <form data-testid="Filters" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>City</label>
        <input {...register("city")} />
      </div>
      <div>
        <label>Country Code</label>
        <input {...register("countryCode")} />
      </div>
      <div>
        <label>State Code</label>
        <input {...register("stateCode")} />
      </div>
      <Controller
        name="startDateTime"
        control={control}
        render={({ field }) => <DateTimeField {...field} />}
      />
      <Controller
        name="endDateTime"
        control={control}
        render={({ field }) => <DateTimeField {...field} />}
      />
      <div>
        <input type="submit" />
      </div>
    </form>
  );
};

export default Filters;
